import NavOptions from "./NavOptions"

export default function Layout1() {
    return (
        <div className="flex flex-row justify-between w-full border border-red-300 flex-grow">
            <div className="flex-initial  min-w-44">
                <NavOptions />
            </div>
            <div className="flex-initial w-full">
                Home Feed
            </div>
            <div className="flex-initial w-2/3 border border-400-purple flex flex-row justify-center">
                <div>
                    Hi center

                </div>

            </div>

        </div>
    )
}