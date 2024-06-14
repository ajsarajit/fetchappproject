import { useState, useEffect, use } from "react";
const url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-05-14&sortBy=publishedAt&apiKey=e77b8006662c4d21b0afe7893f3626c8'

const fetchData = async (page:any) => {
  const response = await fetch(`${url}&page=${page}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.articles;
};
const News = () => {
  const [data, setData] = useState([]);
  const [page,setPage] = useState(1);
  const [displayData,setDisplayData] = useState([]);
  const [dataIndex,setDataIndex] = useState(0)


  useEffect(() => {
    const loadData = async () => {
        try {
            const batchData = await fetchData(page);
            setData(batchData);
            setDisplayData([]);
            setDataIndex(0);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        loadData();
      }, [page]);

   useEffect(() => {
        if (data.length === 0) return;
        const interval = setInterval(() => {
          setDisplayData((prev) => [
            ...prev,
            ...data.slice(dataIndex, dataIndex + 2),
          ]);
          setDataIndex((prev) => prev + 2);
        }, 5000);
    
        return () => clearInterval(interval);
      }, [data, dataIndex]);

      useEffect(() => {
        if (dataIndex >= data.length && data.length > 0) {
          setPage((prev) => prev + 1);
        }
      }, [dataIndex, data]);

  return (
    <div>
      early news
      <div>
        {
            
            displayData.map((d:any,index)=>{
                {
                    return <ul typeof="1" key={index}>
                    <li>{d.content}</li>
                    <button >Delete</button>
                    <button>Add to top</button>
                </ul>
                }
                
            })
        }
      </div>
    </div>
  );
};
export default News;


