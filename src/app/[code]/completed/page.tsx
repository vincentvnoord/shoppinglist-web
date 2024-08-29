import ProductGroup from "@/components/Group"

export default function CompletedPage() {
    return (
        <div className="flex flex-col flex-grow items-center gap-3 flex-shrink overflow-scroll overflow-x-hidden">
            <ProductGroup completed />
        </div>
    )
}