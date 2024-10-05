import SharedLayout from "@/appcomponents/SharedLayout"

const rhymeRules = [
    "Race against time to get as many rhymes as the word of the day.",
    "Example: ",
    "If the word of the day is RAMBUNCTIOUS some rhymes could be Scrumptious, Compunctious, Fictious, Combustious, etc.",
    "Ran out of time? Come back tomorrow and play again!"
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SharedLayout gameMode="Rhyme" rules={rhymeRules}>
            {children}
        </SharedLayout>
    );
}