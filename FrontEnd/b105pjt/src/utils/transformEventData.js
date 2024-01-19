const transformEventData = (dummyData) => {
  const transformedData = dummyData.data.flatMap((event) => [
    {
      title: event.company_name,
      date: event.start,
      color: "#ED544A",
    },
    {
      title: event.company_name,
      date: event.end,
      color: "#929292",
    },
  ]);

  //   console.log(transformedData);
  return transformedData;
};

export default transformEventData;
