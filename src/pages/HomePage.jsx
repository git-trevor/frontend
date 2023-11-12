function HomePage(){
    return(
        <div className="flex items-center justify-center h-screen">
            <div className="bg-sky-100 max-w-md w-full p-10 rounded-full">
                <h1 className="text-center text-5xl font-Caveat">MediPet</h1>
                <h2 className="text-center text-2xl font-Caveat">Cuidando a tu Mascota</h2>
                <div>
                    <p className="text-center text-xl font-Caveat">
                        Esta aplicación ha sido desarrollada con la finalidad de ser una herramienta que nos auxilie con los cuidados
                        que nuestra mascota pueda requerir.
                    </p>
                    <hr className="my-5 h-px border-t-2" />
                    <p className="text-center text-xs">
                        MidnaSw &#9400; 2023 Derechos Reservados
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage