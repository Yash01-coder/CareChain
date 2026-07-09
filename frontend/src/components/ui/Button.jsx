import clsx from "clsx";

export default function Button({
    children,
    className,
    variant="primary",
    ...props
}){

const variants={
primary:
"bg-blue-600 text-white hover:bg-blue-700",

secondary:
"bg-teal-500 text-white hover:bg-teal-600",

outline:
"border border-slate-300 hover:bg-slate-100",

ghost:
"hover:bg-slate-100"
}

return(

<button

className={clsx(

"px-6 py-3 rounded-2xl font-medium transition-all duration-300",

variants[variant],

className

)}

{...props}

>

{children}

</button>

)

}