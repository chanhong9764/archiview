const transformEventData = (dummyData) => {
  const transformedData = dummyData.flatMap((event) => [
    {
      // 순서를 예쁘게 출력하기위한 가라 데이터..
      title: "\n" + event.companyName,
      date: event.start,
      color: "#ED544A", // 예시 색상
      id: event.id,
    },
    {
      title: event.companyName,
      date: event.end,
      color: "#929292", // 예시 색상
      id: event.id,
    },
  ]);
  return transformedData;
};

export default transformEventData;
