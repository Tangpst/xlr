export async function onRequest({ env, request }) {
    try {
        const workerResponse = await env.DOC_WORKER.fetch(
            'https://worker-internal/api/v2', 
            {
                method: request.method,
                headers: request.headers,
                body: request.body
            }
        );
        
        return new Response(workerResponse.body, {
            status: workerResponse.status,
            headers: workerResponse.headers
        });
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: '服务不可用', 
            message: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}