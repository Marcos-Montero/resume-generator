import { promises as fs } from "fs";
import path from "path";
import { CompanyVersion, CompanyVersionHistory, CompanyVersionMeta, ChangeDetail } from "@/types/company-version";

const DATA_DIR = path.join(process.cwd(), "src", "data", "company-versions");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

function getCompanyFilePath(companyId: string): string {
  return path.join(DATA_DIR, `${companyId}.json`);
}

export async function getAllCompanyMetas(): Promise<CompanyVersionMeta[]> {
  await ensureDataDir();
  
  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    
    const metas: CompanyVersionMeta[] = [];
    
    for (const file of jsonFiles) {
      try {
        const content = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
        const history: CompanyVersionHistory = JSON.parse(content);
        const currentVersion = history.versions.find((v) => v.id === history.currentVersionId);
        
        metas.push({
          id: history.companyId,
          companyId: history.companyId,
          companyName: history.companyName,
          jobTitle: currentVersion?.jobTitle || "",
          currentVersionId: history.currentVersionId,
          versionCount: history.versions.length,
          updatedAt: history.updatedAt,
        });
      } catch (e) {
        console.error(`Error reading ${file}:`, e);
      }
    }
    
    return metas.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch {
    return [];
  }
}

export async function getCompanyHistory(companyId: string): Promise<CompanyVersionHistory | null> {
  await ensureDataDir();
  
  try {
    const content = await fs.readFile(getCompanyFilePath(companyId), "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function getCompanyVersion(companyId: string, versionId: string): Promise<CompanyVersion | null> {
  const history = await getCompanyHistory(companyId);
  if (!history) return null;
  
  return history.versions.find((v) => v.id === versionId) || null;
}

export async function getCurrentCompanyVersion(companyId: string): Promise<CompanyVersion | null> {
  const history = await getCompanyHistory(companyId);
  if (!history) return null;
  
  return history.versions.find((v) => v.id === history.currentVersionId) || null;
}

export async function createCompanyVersion(
  companyName: string,
  jobTitle: string,
  resumeData: CompanyVersion["resumeData"],
  baseVersionId: string,
  jobDescription?: string,
  notes?: string,
  llmPromptUsed?: string,
  changeSummary?: string,
  changes?: ChangeDetail[]
): Promise<CompanyVersion> {
  await ensureDataDir();
  
  const companyId = generateId();
  const versionId = generateId();
  const now = new Date().toISOString();
  
  const version: CompanyVersion = {
    id: versionId,
    companyId,
    companyName,
    jobTitle,
    jobDescription,
    notes,
    baseVersionId,
    resumeData,
    createdAt: now,
    updatedAt: now,
    version: 1,
    llmPromptUsed,
    changeSummary: changeSummary || "Initial version tailored for position",
    changes: changes || [],
  };
  
  const history: CompanyVersionHistory = {
    companyId,
    companyName,
    versions: [version],
    currentVersionId: versionId,
    createdAt: now,
    updatedAt: now,
  };
  
  await fs.writeFile(getCompanyFilePath(companyId), JSON.stringify(history, null, 2));
  
  return version;
}

export async function addVersionToCompany(
  companyId: string,
  resumeData: CompanyVersion["resumeData"],
  jobTitle?: string,
  jobDescription?: string,
  notes?: string,
  llmPromptUsed?: string,
  changeSummary?: string,
  changes?: ChangeDetail[]
): Promise<CompanyVersion | null> {
  const history = await getCompanyHistory(companyId);
  if (!history) return null;
  
  const currentVersion = history.versions.find((v) => v.id === history.currentVersionId);
  if (!currentVersion) return null;
  
  const now = new Date().toISOString();
  const versionId = generateId();
  const maxVersion = Math.max(...history.versions.map((v) => v.version));
  
  const newVersion: CompanyVersion = {
    id: versionId,
    companyId,
    companyName: history.companyName,
    jobTitle: jobTitle || currentVersion.jobTitle,
    jobDescription: jobDescription ?? currentVersion.jobDescription,
    notes: notes ?? currentVersion.notes,
    baseVersionId: currentVersion.baseVersionId,
    resumeData,
    createdAt: now,
    updatedAt: now,
    version: maxVersion + 1,
    llmPromptUsed,
    changeSummary: changeSummary || "Version updated",
    changes: changes || [],
  };
  
  history.versions.push(newVersion);
  history.currentVersionId = versionId;
  history.updatedAt = now;
  
  await fs.writeFile(getCompanyFilePath(companyId), JSON.stringify(history, null, 2));
  
  return newVersion;
}

export async function updateCompanyMeta(
  companyId: string,
  updates: { companyName?: string; jobTitle?: string; notes?: string }
): Promise<CompanyVersionHistory | null> {
  const history = await getCompanyHistory(companyId);
  if (!history) return null;
  
  const now = new Date().toISOString();
  
  if (updates.companyName) {
    history.companyName = updates.companyName;
    history.versions.forEach((v) => {
      v.companyName = updates.companyName!;
    });
  }
  
  const currentVersion = history.versions.find((v) => v.id === history.currentVersionId);
  if (currentVersion) {
    if (updates.jobTitle) currentVersion.jobTitle = updates.jobTitle;
    if (updates.notes !== undefined) currentVersion.notes = updates.notes;
    currentVersion.updatedAt = now;
  }
  
  history.updatedAt = now;
  
  await fs.writeFile(getCompanyFilePath(companyId), JSON.stringify(history, null, 2));
  
  return history;
}

export async function switchToVersion(companyId: string, versionId: string): Promise<boolean> {
  const history = await getCompanyHistory(companyId);
  if (!history) return false;
  
  const versionExists = history.versions.some((v) => v.id === versionId);
  if (!versionExists) return false;
  
  history.currentVersionId = versionId;
  history.updatedAt = new Date().toISOString();
  
  await fs.writeFile(getCompanyFilePath(companyId), JSON.stringify(history, null, 2));
  
  return true;
}

export async function deleteCompany(companyId: string): Promise<boolean> {
  try {
    await fs.unlink(getCompanyFilePath(companyId));
    return true;
  } catch {
    return false;
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
