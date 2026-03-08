# Airtable Tracking Setup

The brazil-lander site sends events to Airtable when users load the page and interact with it.

## Cloudflare Configuration

Add in **Settings → Variables and Secrets**:

| Name | Type | Description |
|------|------|--------------|
| `Airtable` | Secret | Your Airtable API key (Personal Access Token) |

## Tracked Events

- **page_load** – Fired when the page loads
- **heartbeat** – Fired every 20 seconds with time on site (seconds). Only counts when tab is visible.
- **cta_click** – Fired when "Get Started" is clicked
- **soundcloud_play** – Fired when play is pressed on the SoundCloud embed
- **soundcloud_pause** – Fired when pause is pressed on the SoundCloud embed
- **embed_click_*** – Fired when links/buttons in the embed zone are clicked

## Airtable Table

Table: `tblvHNc31303yFdbg`

Add a **Duration** field (Number, integer) for heartbeat events.

| Field | Type | Description |
|-------|------|-------------|
| User | Single line text | Unique ID per visitor (stored in localStorage) |
| Action | Single line text | Event type (page_load, heartbeat, cta_click, etc.) |
| Site | Single line text | Subdomain or path (e.g. brazil-lander) |
| Duration | Number | Seconds on site (heartbeat events only) |
