const SelectArrowDown = ({color, size}) => {
    return (
        <span className={`${color ? color : 'text-[var(--muted-foreground)]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color ? color : ''} lucide lucide-chevron-down ${size ? size : 'size-4'}`}><path d="m6 9 6 6 6-6"></path></svg>
        </span>
    );
}

export default SelectArrowDown;