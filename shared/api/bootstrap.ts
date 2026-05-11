import { loadApiConfig } from "@/shared/storage/async";
import { setApiBaseUrl } from "./baseUrl";

export async function initializeApiBaseUrl() {
    const config = await loadApiConfig();
    setApiBaseUrl(config?.url);
}