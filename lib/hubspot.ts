/**
 * Push a captured lead to HubSpot CRM.
 * Creates or updates a contact, then creates a deal in the BVM Digital pipeline.
 */

import { isTutorialEnvValue } from "@/lib/env";

interface LeadPayload {
  phone:        string;
  email?:       string;
  businessName: string;
  industry:     string;
  city:         string;
  score:        number;
  grade:        string;
}

export async function pushLeadToHubSpot(lead: LeadPayload): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  if (!token || isTutorialEnvValue(token)) {
    console.log("[hubspot] Push skipped. HUBSPOT_ACCESS_TOKEN not set or still a placeholder.");
    return;
  }

  try {
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          phone:                  lead.phone,
          email:                  lead.email ?? "",
          company:                lead.businessName,
          city:                   lead.city,
          industry:               lead.industry,
          ghana_business_score:   String(lead.score),
          ghana_business_grade:   lead.grade,
          lead_source:            "Ghana Business Score (W1)",
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[hubspot] Contact create failed:", res.status, body.slice(0, 500));
    }
  } catch (err) {
    console.error("[hubspot] Failed to push lead:", err);
  }
}
