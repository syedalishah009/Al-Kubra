import React from 'react'

const Sponsers = () => {
    return (
        <div class="w-full bg-gray-100 py-16 shadow-md border-b-4">
            <h2 class="mx-2 text-center text-2xl font-bold uppercase tracking-wide text-secondry md:text-3xl">Sponsers</h2>
            <hr class="mx-auto mt-4 h-1 w-32 border-0 bg-secondary" />

            <div class="container mx-auto flex flex-wrap items-center justify-center space-y-3 py-10">
                <div class="w-40 mt-10 px-6">
                    <img src="./images/brand5.png" alt="Corporate Inc" />
                </div>
                <div class="w-40 px-6">
                    <img src="./images/brand2.png" alt="Corporate Inc" />
                </div>
                <div class="w-40 px-6">
                    <img src="./images/brand3.png" alt="Corporate Inc" />
                </div>
            </div>
        </div>

    )
}

export default Sponsers