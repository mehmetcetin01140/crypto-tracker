import { Dispatch, SetStateAction } from "react";

type Props = {
  searchParam: string;
  setSearchParam: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ searchParam, setSearchParam }: Props) {

  return (
    <div className="search-input">
      <input
        type="text"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
