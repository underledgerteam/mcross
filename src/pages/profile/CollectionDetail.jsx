import { useParams } from "react-router-dom";

const CollectionDetail = () => {
  const params = useParams();
    return (
        <div>
            Collection Detail: {params.id}
        </div>
    )
}

export default CollectionDetail;