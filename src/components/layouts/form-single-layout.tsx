import Image from "next/image";

export default function FormSingleLayout({ maxWidth = 450, children }) {
    return (
        <>
            <div className=" d-flex flex-column justify-content-center align-items-center" style={{ height: "100%", minHeight: "100vh", width: "100vw" }}>
                <Image src="/logo.svg" width={113} height={39} alt="Logo" />
                <div className="card mt-3 p-4 shadow-sm rounded-4" style={{ width: "100%", maxWidth: maxWidth }}>
                    {children}
                </div>

                <footer className="mt-3 text-muted small text-center">
                    &copy; {new Date().getFullYear()} M.A.Dole
                </footer>
            </div>
        </>
    );
}
