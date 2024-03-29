import { useGlobalStore } from "../stores/globalStore";
import { SortOptionRow } from "./SortOptionRow";

export const SortOptions = () => {
    const { sortOptions } = useGlobalStore();
    const isSortDateNew: boolean = sortOptions.get("sortDateNew") ?? true;
    const isSortDateOld: boolean = sortOptions.get("sortDateOld") ?? false;

    return (
        <div className="sort-options">
            <h3 className="sort-options__header">СОРТИРОВКА</h3>
            <div className="sort-options__rows">
                <SortOptionRow
                    defaultChecked={isSortDateNew}
                    value="sortDateNew"
                >
                    Новые
                </SortOptionRow>
                <SortOptionRow
                    defaultChecked={isSortDateOld}
                    value="sortDateOld"
                >
                    Старые
                </SortOptionRow>
            </div>
        </div>
    );
};
