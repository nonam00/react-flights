import {useAddFlight} from "@/hooks/useAddFlight.ts";
import {FormEvent, useRef} from "react";

export default function AddForm() {
  const {
    handle,
    setTitle, setDate, setFromCity, setToCity,
    isPending
  } = useAddFlight();

  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handle();
    formRef.current?.reset()
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col m-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm selected"
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Date</label>
          <input
            className="border-1 rounded-sm selected"
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
            onChange={(e) => setFromCity(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>To City</label>
          <input
            className="border-1 rounded-sm selected"
            onChange={(e) => setToCity(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
      </div>
      <div>
        <button
          className="px-3 py-1 m-1"
          disabled={isPending}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
}