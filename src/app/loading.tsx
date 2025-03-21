import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  )
}