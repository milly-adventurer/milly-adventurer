interface Options {
	from?: number;
	to?: number;
	content: string;
}

const getLinearGradient = ({
	content,
	from,
	to
}: Options): string => {
	return `linear-gradient(rgba(0, 0, 0, ${from}), rgba(0, 0, 0,${to})), ${content}`;
};

export default getLinearGradient;
