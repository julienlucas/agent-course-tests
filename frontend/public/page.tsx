import Image from "next/image";

export default function Page() {
  return (
    <body>
      <main id="content">
        {/* Content */}
        <div className="relative h-screen">
          <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Title */}
            <div className="text-center">
              <div className="mb-4 flex justify-center items-center">
                {/* Logo */}
                <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="https://preline.co/templates.html" aria-label="Preline">
                  <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696Z" className="fill-blue-600 dark:fill-white" fill="currentColor" />
                    <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" className="stroke-blue-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                    <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" className="stroke-blue-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                    <circle cx="13" cy="16.5214" r="5" className="fill-blue-600 dark:fill-white" fill="currentColor" />
                  </svg>
                </a>
                {/* End Logo */}
              </div>

              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                Welcome to Preline AI
              </h1>
              <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Your AI-powered copilot for the web
              </p>
            </div>
            {/* End Title */}

            <ul className="mt-16 space-y-5">
              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                {/* Card */}
                <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    How can we help?
                  </h2>
                  <div className="space-y-1.5">
                    <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                      You can ask questions like:
                    </p>
                    <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                      <li className="text-sm text-gray-800 dark:text-white">
                        What's Preline UI?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        How many Starter Pages &amp; Examples are there?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        Is there a PRO version?
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End Card */}
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      what's preline ui?
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-800 dark:text-white">
                        Here're some links to get started
                      </p>
                      <ul>
                        <li>
                          <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400" href="https://preline.co/docs/index.html">
                            Installation Guide
                          </a>
                        </li>
                        <li>
                          <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400" href="https://preline.co/docs/frameworks.html">
                            Framework Guides
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Card */}

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              Chat Bubble
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      what's preline ui figma?
                    </p>
                    <div className="mt-3">
                      <button type="button" className="p-2 inline-flex justify-center items-center gap-x-1 rounded-lg bg-white/10 border border-transparent font-medium text-gray-100 hover:text-gray-600 hover:bg-white focus:outline-hidden focus:ring-2 ring-offset-blue-600 focus:ring-white focus:ring-offset-2 text-xs">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Voice message
                      </button>
                    </div>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      create a table example with preline using avatars, badges and progress bars
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Preline UI Figma is the largest free design system for Figma, crafted with Tailwind CSS styles and Preline UI components with extra top-notch additions.
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-800 dark:text-white">
                        With the features like:
                      </p>
                      <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                        <li className="text-sm text-gray-800 dark:text-white">
                          12-column Grid System
                        </li>

                        <li className="text-sm text-gray-800 dark:text-white">
                          Easily find UI elements
                        </li>

                        <li className="text-sm text-gray-800 dark:text-white">
                          Variants and Properties
                        </li>

                        <li className="text-sm text-gray-800 dark:text-white">
                          Tailwind CSS Color styles
                        </li>

                        <li className="text-sm text-gray-800 dark:text-white">
                          Auto layout and constraints
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Card */}

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      create a table example with preline using avatars, badges and progress bars
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Hold on a sec...
                    </p>
                  </div>
                  {/* End Card */}

                  {/* Table Section */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                    {/* Table */}
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                          <thead className="bg-gray-50 dark:bg-neutral-800">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    Name
                                  </span>
                                </div>
                              </th>

                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    Status
                                  </span>
                                </div>
                              </th>

                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    Portfolio
                                  </span>
                                </div>
                              </th>

                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    Created
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            <tr>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img className="inline-block size-9.5 rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Avatar" />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Christina Bersh</span>
                                      <span className="block text-sm text-gray-500 dark:text-neutral-500">christina@site.com</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    Active
                                  </span>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500 dark:text-neutral-500">1/5</span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                      <div className="flex flex-col justify-center overflow-hidden bg-gray-800 text-xs text-white text-center whitespace-nowrap dark:bg-neutral-200" style={{width: '25%'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">28 Dec, 12:12</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img className="inline-block size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Avatar" />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">David Harrison</span>
                                      <span className="block text-sm text-gray-500 dark:text-neutral-500">david@site.com</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    Warning
                                  </span>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500 dark:text-neutral-500">3/5</span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}>
                                      <div className="flex flex-col justify-center overflow-hidden bg-gray-800 text-xs text-white text-center whitespace-nowrap dark:bg-neutral-200" style={{width: '78%'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">20 Dec, 09:27</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="inline-flex items-center justify-center size-9.5 rounded-full bg-gray-300 dark:bg-neutral-700">
                                      <span className="font-medium text-gray-800 dark:text-neutral-200">A</span>
                                    </span>
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Anne Richard</span>
                                      <span className="block text-sm text-gray-500 dark:text-neutral-500">anne@site.com</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    Active
                                  </span>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500 dark:text-neutral-500">5/5</span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                                      <div className="flex flex-col justify-center overflow-hidden bg-gray-800 text-xs text-white text-center whitespace-nowrap dark:bg-neutral-200" style={{width: '100%'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">18 Dec, 15:20</span>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img className="inline-block size-9.5 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Avatar" />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">Samia Kartoon</span>
                                      <span className="block text-sm text-gray-500 dark:text-neutral-500">samia@site.com</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    Active
                                  </span>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500 dark:text-neutral-500">0/5</span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={1} aria-valuemin={0} aria-valuemax={100}>
                                      <div className="flex flex-col justify-center overflow-hidden bg-gray-800 text-xs text-white text-center whitespace-nowrap dark:bg-neutral-200" style={{width: '1%'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">18 Dec, 15:20</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* End Table */}
                  </div>
                  {/* End Table Section */}

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      show me the code
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Of course!
                    </p>
                  </div>
                  {/* End Card */}

                  <div className="mt-3 flex-none min-w-full bg-gray-800 font-mono text-sm p-5 rounded-lg dark:bg-neutral-800"><span className="text-red-500">&lt;</span><span className="text-red-500">table <span className="text-gray-300">className="<span className="text-sky-400">min-w-full divide-y divide-gray-200 dark:divide-neutral-700</span>"</span><span className="text-red-500">&gt;</span><span className="block"></span> <span className="ms-5 text-red-500">&lt;</span><span className="text-red-500">thead <span className="text-gray-300">className="<span className="text-sky-400">bg-gray-50 dark:bg-neutral-800</span>"</span><span className="text-red-500">&gt;</span><span className="block"></span><span className="text-red-500"> <span className="ms-10 text-gray-500 dark:text-neutral-500">...</span></span></span></span></div>

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      quiz me about tailwindcss
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Sure!
                    </p>
                  </div>
                  {/* End Card */}

                  <div>
                    <button type="button" className="mb-2.5 me-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 focus:outline-hidden focus:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 dark:focus:text-blue-400 dark:focus:border-blue-400">
                      Is Tailwind CSS a free library?
                    </button>
                    <button type="button" className="mb-2.5 me-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 focus:outline-hidden focus:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 dark:focus:text-blue-400 dark:focus:border-blue-400">
                      What's the latest Tailwind CSS version?
                    </button>
                    <button type="button" className="mb-2.5 me-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 focus:outline-hidden focus:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 dark:focus:text-blue-400 dark:focus:border-blue-400">
                      Is it a utility-class based?
                    </button>
                  </div>

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      generate 3-dimensional abstract images
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Here you go...
                    </p>
                  </div>
                  {/* End Card */}

                  <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                      <img className="w-full object-cover" src="https://images.unsplash.com/photo-1677644334825-0eb411012ac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Deep Learning" />
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                      <img className="w-full object-cover" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Deep Learning" />
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                      <img className="w-full object-cover" src="https://images.unsplash.com/photo-1680193895115-b51b4ed5392f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Deep Learning" />
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                      <img className="w-full object-cover" src="https://images.unsplash.com/photo-1680587590161-3a1dd77a7609?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Deep Learning" />
                    </div>
                  </div>

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      what's tailwindcss?
                    </p>
                  </div>
                  {/* End Card */}
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="flex gap-x-2 sm:gap-x-4">
                <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="6" fill="#2563EB" />
                  <path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5" />
                  <path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5" />
                  <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
                </svg>

                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.
                    </p>
                    <div className="space-y-1.5">
                      <ul>
                        <li>
                          <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400" href="#">
                            Get started with Tailwind CSS
                          </a>
                        </li>
                        <li>
                          <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400" href="#">
                            Tailwind CSS Installation guide
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Card */}

                  {/* Button Group */}
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Button Group */}
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div>
                  <div className="text-end">
                    <button type="button" className="mb-2.5 ms-1.5 mb-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 focus:outline-hidden focus:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 dark:focus:text-blue-400 dark:focus:border-blue-400">
                      What is the use of Tailwind CSS?
                    </button>
                    <button type="button" className="mb-2.5 ms-1.5 mb-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-lg border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 focus:outline-hidden focus:bg-blue-50 text-sm dark:bg-neutral-900 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 dark:focus:text-blue-400 dark:focus:border-blue-400">
                      What is the difference between Tailwind CSS and CSS?
                    </button>
                  </div>
                </div>
              </li>
              {/* End Chat Bubble */}

              {/* Chat Bubble */}
              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                    <p className="text-sm text-white">
                      2 files uploaded
                    </p>
                  </div>
                  {/* End Card */}

                  <ul className="flex flex-col justify-end text-start -space-y-px">
                    <li className="flex items-center gap-x-2 p-3 text-sm bg-white border border-gray-200 text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                      <div className="w-full flex justify-between truncate">
                        <span className="me-3 flex-1 w-0 truncate">
                          resume_web_ui_developer.csv
                        </span>
                        <button type="button" className="flex items-center gap-x-2 text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 whitespace-nowrap dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </li>
                    <li className="flex items-center gap-x-2 p-3 text-sm bg-white border border-gray-200 text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                      <div className="w-full flex justify-between truncate">
                        <span className="me-3 flex-1 w-0 truncate">
                          coverletter_web_ui_developer.pdf
                        </span>
                        <button type="button" className="flex items-center gap-x-2 text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 whitespace-nowrap dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white">AZ</span>
                </span>
              </li>
              {/* End Chat Bubble */}
            </ul>
          </div>

          <div className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
            {/* Textarea */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
              <div className="flex justify-between items-center mb-3">
                <button type="button" className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-blue-500 dark:focus:text-blue-500">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  New chat
                </button>

                <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                  </svg>
                  Stop generating
                </button>
              </div>

              {/* Input */}
              <div className="relative">
                <textarea className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Ask me anything..."></textarea>

                {/* Toolbar */}
                <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    {/* Button Group */}
                    <div className="flex items-center">
                      {/* Mic Button */}
                      <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <line x1="9" x2="15" y1="15" y2="9" />
                        </svg>
                      </button>
                      {/* End Mic Button */}

                      {/* Attach Button */}
                      <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </button>
                      {/* End Attach Button */}
                    </div>
                    {/* End Button Group */}

                    {/* Button Group */}
                    <div className="flex items-center gap-x-1">
                    {/* Mic Button */}
                {/* End Button Group */}

                {/* Button Group */}
                <div className="flex items-center gap-x-1">
                  {/* Mic Button */}
                  <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </button>
                  {/* End Mic Button */}

                  {/* Send Button */}
                  <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-hidden focus:bg-blue-500">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  </button>
                  {/* End Send Button */}
                </div>
                {/* End Button Group */}
              </div>
            </div>
            {/* End Toolbar */}
          </div>
          {/* End Input */}
        </div>
        {/* End Textarea */}
      </div>
    </div>
    {/* End Content */}
    </div>
  </main>
  {/* ========== END MAIN CONTENT ========== */}

  {/* JS Implementing Plugins */}

  {/* JS PLUGINS */}
  {/* Required plugins */}
  <script src="https://cdn.jsdelivr.net/npm/preline/dist/index.js"></script>
  <script src="https://preline.co/assets/vendor/prism/prism.js"></script>

  </body>
  );
}
