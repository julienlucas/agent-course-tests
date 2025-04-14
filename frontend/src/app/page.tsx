"use client"
import { useState, useRef } from "react";
import Image from "next/image";

export default function Page() {
  const [responses, setResponses] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const [firstSearch, setFirstSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [hoverFile, setHoverFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    setSearch(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_prompt", "Le résumé doit faire max 100mots");
    let newReponses = [...responses];
    // newReponses.unshift(file.name);

    try {
      const BACKEND_AGENT_API_URL =
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/"
          : "https://agent-course-tests.onrender.com/";

      setFirstSearch(true);
      const response = await fetch(BACKEND_AGENT_API_URL, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: formData,
      });
      const textData = await response.text();

      setSearch(false);
      setFile(null);
      newReponses.unshift(textData);
      setResponses(newReponses);
    } catch (error) {
      setSearch(false);
      setHoverFile(false);
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  return (
    <main className="px-4 w-full">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/julien-lucas-b.jpg"
              className="rounded-full text-center"
              alt="Agent IA"
              width={100}
              height={100}
              draggable="false"
            />
          </div>
          <h2 className="relative pt-8 text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            <span className="font-bold text-5xl py-0 pr-3 pl-1 rounded-[.4rem] italic bg-gradient-to-r from-slate-700 via-indigo-600 bg-clip-text to-violet-500 inline-block text-transparent">
              Alfred
            </span>
          </h2>
          <h1 className="relative pt-2 text-3xl font-bold sm:text-4xl">
            L'Agent RAG qui synthètise vos documents 👌
          </h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Ajoutez un document PDF à synthètiser par l'IA, cliquez sur envoyer et
            attendez 10-15 secondes
          </p>
        </div>
        {/* End Title */}
      </div>

      <div>
        {/* <div className={`${firstSearch && "absolute left-0 right-0 bottom-6"}`}> */}
        <div className="relative shadow-[#dedede] shadow-lg max-w-4xl w-full mx-auto bottom-0 z-10 rounded-xl border border-gray-200 px-4 sm:px-0">
          <div className="max-w-4xl w-full">
            <div
              className="relative"
              onMouseEnter={() => setHoverFile(true)}
              onMouseLeave={() => setHoverFile(false)}
            >
              {file && (
                <div className="relative m-2 mb-0 py-2 px-2 rounded-lg border border-gray-200 text-sm bg-gray-100 text-gray-600 font-bold w-fit">
                  <div
                    onClick={() => setFile(null)}
                    className={`${
                      hoverFile ? "block" : "hidden"
                    } absolute cursor-pointer -right-3 -top-3 flex border border-gray-200 justify-center items-center rounded-full items-center bg-white rounded-full w-6 h-6`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="bg-rose-500 text-xs p-2 py-1 pb-[2px] rounded-[7px] text-white mr-2 uppercase">
                    {file ? file?.type.slice(-3) : null}
                  </span>
                  {file ? file?.name : null}
                </div>
              )}
              {/* Textarea */}
              <textarea
                className="resize-none relative outline-none focus:outline-hidden p-4 sm:p-4 pb-[25px] sm:pb-[25px] block w-full border-gray-200 rounded-lg sm:text-lg font-medium disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
                placeholder="Par défaut le system prompt est configuré pour résumer"
              />

              {/* Toolbar */}
              <div className="absolute bottom-px inset-x-px px-2 pb-2 rounded-b-lg dark:bg-neutral-900">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  {/* Button Group */}
                  <div className="flex items-center">
                    {/* Attach Button */}
                    <input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                      hidden
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer bg-gray-100 hover:bg-gray-200 inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
                      {/* Send Button */}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="font-bold transition-all duration-100 cursor-pointer px-2 py-1 inline-flex shrink-0 justify-center items-center rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-hidden focus:bg-blue-500"
                      >
                        Résumer
                        <svg
                          className="shrink-0 size-3.5 pl-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
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
      </div>

      <div className="max-w-4xl py-10 lg:py-14 mx-auto">
        {search && (
          <div className="px-4 mb-10 mt-4 flex justify-start space-x-2">
            <div className="animate-bouncing h-1 w-1 bg-gray-300 mr-2 rounded-full animation-delay-200" />
            <div className="animate-bouncing h-1 w-1 bg-gray-300 mr-2 rounded-full animation-delay-400" />
            <div className="animate-bouncing h-1 w-1 bg-gray-300 mr-2 rounded-full" />
          </div>
        )}

        {responses.length > 0 &&
          responses.map((response: any, i: number) => (
            <ul key={`${i}-reponse`} className="relative mt-4 mb-10 space-y-5">
              {/* Chat Bubble */}
              <li className="mt-4 mb-2 max-w-5xl ms-auto flex justify-start gap-x-2 sm:gap-x-4">
                <div className="grow text-start space-y-3">
                  {/* Card */}
                  <div className="inline-block bg-blue-600 rounded-xl p-4 shadow-2xs bg-blue-600">
                    <p
                      className="text-sm text-white"
                      dangerouslySetInnerHTML={{ __html: response }}
                    />
                  </div>
                  {/* End Card */}
                </div>

                <span className="inline-flex shrink-0 items-center justify-center size-9.5 rounded-full bg-slate-600">
                  <span className="text-sm font-medium text-white">IA</span>
                </span>
              </li>
              {/* End Chat Bubble */}
            </ul>
          ))}

        <div className="max-w-2xl py-10 lg:py-14 mx-auto">
          <p className="text-center">Réalisé avec</p>

          <div className="mt-5 max-w-xl mx-auto md:flex grid md:grid-cols-6 grid-cols-1 gap-2 w-full">
            <div className="relative mx-auto w-40 w-full h-12">
              <Image
                className="-mt-2"
                src="/logo-next.svg"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
            <div className="relative mx-auto w-40 w-full h-4">
              <Image
                className="md:-ml-1 ml-0 md:mt-2 -mt-2"
                src="/logo-tailwind.svg"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
            <div className="relative mx-auto max-w-40 w-full h-6">
              <Image
                className="md:ml-4 ml-0"
                src="/logo-pinecone.svg"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
            <div className="relative mx-auto max-w-40 w-full h-8">
              <Image
                className=""
                src="/logo-python.svg"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
            <div className="relative mx-auto max-w-44 w-full md:h-8 h-12">
              <Image
                className=""
                src="/logo-llama-index.webp"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
            <div className="relative mx-auto max-w-40 w-full h-8">
              <Image
                className=""
                src="/logo-mistral.svg"
                alt="Développement de saas mvp, création de saas, développement d'application saas, création de mvp saas"
                fill
                draggable="false"
              />
            </div>
          </div>

          <p className="text-center">
            Vous êtes fondateur, une startup, et vous avez un projet à réaliser?
            <br />
            Je réalise vos projets de MVP IA et saas vitesse éclair (moins d'1 mois). Intéréssé?
          </p>
          <br />
          <div className="relative flex justify-center">
            <button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/julien-lucas-jl/",
                  "_blank"
                )
              }
              className="font-bold transition-all duration-100 text-xl flex justify-center cursor-pointer px-5 py-4 inline-flex shrink-0 justify-center items-center rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-hidden focus:bg-blue-500"
            >
              Contactez-moi
            </button>
          </div>
        </div>
      </div>
      {/* End Content */}
    </main>
  );
}
