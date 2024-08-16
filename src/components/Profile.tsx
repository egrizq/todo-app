import Image from "next/image";
import { Logout } from "./Logout";

interface TypeProfile {
    image: string;
    name: string;
}

export function Profile(data: TypeProfile) {
    return (
        <>
            <div className="flex justify-between pb-2">
                <div className="flex flex-row items-center space-x-2">
                    <Image
                        src={data.image}
                        width={35}
                        height={35}
                        alt="profile picture"
                        className="rounded-full"
                    />

                    <p className="font-semibold">
                        {data.name}
                    </p>
                </div>

                <Logout />
            </div>
        </>
    )
}