# Airtable Tracking Setup

The brazil-lander site sends events to Airtable when users load the page and interact with it.

## Cloudflare Configuration

Add in **Settings → Variables and Secrets**:

| Name | Type | Description |
|------|------|--------------|
| `Airtable` | Secret | Your Airtable API key (Personal Access Token) |

## Tracked Events

- **page_load** – Fired when the page loads
- **cta_click** – Fired when "Get Started" is clicked
- **embed_click_*** – Fired when links/buttons in the embed zone are clicked

## Airtable Table

Table: `tblvHNc31303yFdbg`

| Field | Type | Description |
|-------|------|-------------|
| User | Single line text | Unique ID per visitor (stored in localStorage) |
| Action | Single line text | Event type (page_load, cta_click, etc.) |
| Site | Single line text | Subdomain or path (e.g. brazil-lander) |
