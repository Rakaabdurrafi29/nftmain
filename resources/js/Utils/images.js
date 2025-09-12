const images = import.meta.glob("../assets/img/*.{jpg,jpeg,png,svg}", {
    eager: true,
    import: "default",
});

export default images;
