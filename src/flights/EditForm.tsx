import {useEditFlight} from "@/hooks/useEditFlight.ts";

export default function EditForm({
  flightId
}: {
  flightId: number
}) {
  const {
    handleEdit, handleCancel,
    flight,
    setTitle, setFromCity, setToCity, setDate,
    isPending
  } = useEditFlight(flightId);
  return (
    <form
      className="flex flex-col m-10"
      onSubmit={handleEdit}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm selected"
            value={flight.title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Date</label>
          <input
            className="border-1 rounded-sm selected"
            value={flight.date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>From City</label>
          <input
            className="border-1 rounded-sm selected"
            value={flight.fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>To City</label>
          <input
            className="border-1 rounded-sm selected"
            value={flight.toCity}
            onChange={(e) => setToCity(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="px-3 py-1 m-1"
          disabled={isPending}
          type="submit"
        >
          Save
        </button>
        <button
          className="px-3 py-1 m-1"
          onClick={handleCancel}
          disabled={isPending}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}