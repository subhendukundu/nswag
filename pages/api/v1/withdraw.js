export default function withdraw(event, res) {
  try {
    if (event.method !== "GET") {
      res.status(401).json({ message: "Invalid Method" });
    }
    const data = { yum: "yum" };
    res.status(200).json({
      // url: sessionData.url
      data,
    });
  } catch (e) {
    console.log("error------->", e);
    res.status(500).json({ message: e.message });
  }
}
