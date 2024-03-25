import { useAppStore } from "../stores/AppStore";

export const SortDate = () => {
    const { switchSortOption } = useAppStore();

    return (
        <div className="sort-date">
            <h3 className="sort-date__header">СОРТИРОВКА</h3>
            <div className="sort-date__row">
                <input
                    className="sort-date__option"
                    type="radio"
                    name="sort-date"
                    value="sortDateNew"
                    defaultChecked={true}
                    onChange={(e) => {
                        switchSortOption(e.target.value);
                    }}
                />
                <label
                    className="sort-date__option-label"
                    htmlFor="sortDateDesc"
                >
                    Новые
                </label>
            </div>

            <div className="sort-date__row">
                <input
                    className="sort-date__option"
                    type="radio"
                    name="sort-date"
                    value="sortDateOld"
                    onChange={(e) => {
                        switchSortOption(e.target.value);
                    }}
                />
                <label
                    className="sort-date__option-label"
                    htmlFor="sortDateAsc"
                >
                    Старые
                </label>
            </div>
        </div>
    );
};
