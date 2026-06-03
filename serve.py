#!/usr/bin/env python3
from __future__ import annotations

import argparse
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


class SPAServer(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        path = self.translate_path(self.path)
        if Path(path).is_dir():
            self.path = self.path.rstrip("/") + "/index.html"
        else:
            requested = Path(path)
            if not requested.exists() and "." not in requested.name:
                self.path = "/index.html"
        return super().do_GET()


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve a Vite build with SPA fallback.")
    parser.add_argument(
        "--dir",
        default="dist",
        help="Directory to serve (default: dist)",
    )
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Host to bind (default: 127.0.0.1)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to bind (default: 8000)",
    )
    args = parser.parse_args()

    root = Path(args.dir).resolve()
    if not root.exists():
        raise SystemExit(f"Directory not found: {root}")

    handler = partial(SPAServer, directory=str(root))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Serving {root} at http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
