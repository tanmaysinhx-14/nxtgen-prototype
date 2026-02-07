import Image from "next/image";

export default function Home() {
  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
      <main className="container bg-white py-5 px-4" style={{ maxWidth: "48rem" }}>
        <div className="d-flex flex-column gap-5">

          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />

          <div className="text-center text-md-start">
            <h1 className="h3 fw-semibold mb-3">
              To get started, edit the page.tsx file.
            </h1>
            <p className="text-secondary fs-5">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js"
                className="fw-medium text-dark text-decoration-none"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn"
                className="fw-medium text-dark text-decoration-none"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3">
            <a
              className="btn btn-dark d-flex align-items-center justify-content-center gap-2 px-4 py-2"
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/vercel.svg"
                alt="Vercel logo"
                width={16}
                height={16}
              />
              Deploy Now
            </a>

            <a
              className="btn btn-outline-dark px-4 py-2"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
