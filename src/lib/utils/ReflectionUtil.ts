class ReflectionUtil {

    public static getFunctionArgumentsNames(func: Function): string[] {
        const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
        return args.split(',').map((arg) => {
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter((arg) => {
            if(arg) {
                return arg;
            }
            return null;
        });
    }
}

export default ReflectionUtil