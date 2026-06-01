import server from "../dist/server/server.js";

export default async function handler(req, res) {
  try {
    // 1. Construct Web Headers from Node request headers
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    // 2. Construct absolute Web URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    // 3. Construct Request Body for POST/PUT requests
    let body = undefined;
    if (!["GET", "HEAD"].includes(req.method)) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    // 4. Create standard Web Request
    const webReq = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    // 5. Invoke the compiled TanStack Start fetch handler
    const webRes = await server.fetch(webReq);

    // 6. Write status and headers to Vercel Node response
    res.statusCode = webRes.status;
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 7. Stream the Web Response body back to Node response
    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error("Vercel Node SSR Handler Error:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
}
