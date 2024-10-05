import { Header } from "@/appcomponents/Header";
import SharedLayout from "@/appcomponents/SharedLayout"

const copyCatRules = [
    "Race against time to get as many synonyms or words with a similar meaning as the word of the day.",
    "Example: ",
    "If the word of the day is RAMBUNCTIOUS some synonyms could be Boisterous, Noisy, Loud, Disorderly, etc.",
    "Ran out of time? Come back tomorrow and play again!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="Copycat" rules={copyCatRules}>
            {children}
        </SharedLayout>
    );
}