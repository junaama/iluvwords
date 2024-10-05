import SharedLayout from "@/appcomponents/SharedLayout"

const antsyRules = [
    "Race against time to get as many antonyms or words with an opposing meaning as the word of the day.",
    "Example: ",
    "If the word of the day is RAMBUNCTIOUS some synonyms could be Boisterous, Calm, Quiet, Silent, etc.",
    "Ran out of time? Come back tomorrow and play again!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="Antsy" rules={antsyRules}>
            {children}
        </SharedLayout>
    );
}