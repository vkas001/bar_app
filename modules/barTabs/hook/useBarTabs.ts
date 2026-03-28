import { getToken } from "@/shared/storage/secure";
import { useEffect, useState } from "react";
import { BarTab, BarTabAPI, CreateBarTabPayload } from "../types/barTab.types";
import { mapBarTabAPIToCard } from "../utils/barTabMapper";

export function useBarTabs() {
    const [tabs, setTabs] = useState<BarTab[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBarTabs = async () => {
        try {
            setLoading(true);
            setError(null);

            const baseUrl = process.env.EXPO_PUBLIC_API_URL;
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/bar-tabs`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error(`Failed to fetch bar tabs: ${res.status}`);

            const json = await res.json();
            const mapped = (json.data as BarTabAPI[]).map(mapBarTabAPIToCard);
            setTabs(mapped);
            console.log("Fetched bar tabs successfully.");
        } catch (e: any) {
            console.error("Error fetching bar tabs:", e);
            setError(e.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const createBarTab = async (payload: CreateBarTabPayload) => {
        try {
            setCreating(true);
            setError(null);

            const baseUrl = process.env.EXPO_PUBLIC_API_URL;
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/bar-tabs`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: payload.customerName,
                    phone: payload.phone || null,
                    notes: payload.notes || null,
                }),
            });

            if (!res.ok) {
                const rawText = await res.text();
                console.log("STATUS:", res.status);
                console.log("RAW ERROR:", rawText);  // console.log not console.error
                throw new Error(`Failed to create bar tab: ${res.status}`);
            }

            console.log("Bar tab created successfully.");
            await fetchBarTabs(); // refresh list
        } catch (e: any) {
            console.error("Error creating bar tab:", e);
            setError(e.message ?? "Something went wrong");
        } finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        fetchBarTabs();
    }, []);

    return { tabs, loading, creating, error, refresh: fetchBarTabs, createBarTab };
}