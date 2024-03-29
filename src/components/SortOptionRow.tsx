import React from "react";
import { useGlobalStore } from "../stores/globalStore";

export const SortOptionRow = (props: {
    defaultChecked: boolean;
    value: string;
    children: React.ReactNode;
}) => {
    const { switchSortOption } = useGlobalStore();
    return (
        <div className="sort-option__row">
            <input
                className="sort-option-row__option"
                type="radio"
                name="sort-options"
                value={props.value}
                defaultChecked={props.defaultChecked}
                onChange={(e) => {
                    switchSortOption(e.target.value);
                }}
            />
            <label className="sort-option-row__label" htmlFor={props.value}>
                {props.children}
            </label>
        </div>
    );
};
