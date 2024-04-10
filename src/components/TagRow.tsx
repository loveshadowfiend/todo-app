import { useGlobalStore } from "../stores/globalStore";

export const TagRow = (props: { children: React.ReactNode }) => {
    const { toggleTagOption, tagOptions } = useGlobalStore();
    const value = props.children?.toString().toLowerCase();
    const isValueChecked = tagOptions.get(value ?? "") ?? true;

    return (
        <div className="tag-row">
            <input
                id={value}
                className="tag-row__option"
                type="checkbox"
                name="tag"
                value={value}
                defaultChecked={isValueChecked}
                onChange={(e) => {
                    toggleTagOption(e.target.value);
                }}
            />
            <label className="tag-row__label" htmlFor={value}>
                {props.children}
            </label>
        </div>
    );
};
