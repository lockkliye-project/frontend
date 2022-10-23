export function hitBreakpoint(breakpoint) {
	return (
		window.innerWidth <= BREAKPOINTS[breakpoint] ||
		window.innerHeight <= BREAKPOINTS[breakpoint]
	);
}
