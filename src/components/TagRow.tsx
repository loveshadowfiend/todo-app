import { useGlobalStore } from "../stores/globalStore";

export const TagRow = (props: { children: React.ReactNode }) => {
    const { toggleTagOption } = useGlobalStore();
    const value = props.children?.toString().toLowerCase();
    return (
        <div className="tag-row">
            <input
                className="tag-row__option"
                type="checkbox"
                name="tag"
                value={value}
                defaultChecked={true}
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
