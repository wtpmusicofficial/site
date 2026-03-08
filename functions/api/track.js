const AIRTABLE_BASE_ID = 'appKxMIaIyWSZ90kO';
const AIRTABLE_TABLE_ID = 'tblvHNc31303yFdbg';

export async function onRequestPost(context) {
  const { env, request } = context;
  const apiKey = env.Airtable;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Airtable secret not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { user, action, site } = body;

    if (!user || !action || !site) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user, action, site' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            User: String(user),
            Action: String(action),
            Site: String(site),
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Airtable API error:', response.status, errText);
      return new Response(
        JSON.stringify({ error: 'Airtable request failed', details: errText }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error('Track error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Allow CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
