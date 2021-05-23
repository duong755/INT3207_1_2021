import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonContent,
  IonRouterLink,
  useIonToast,
} from "@ionic/react";
import { close, compassSharp } from "ionicons/icons";
import Rating from "@material-ui/lab/Rating";
import { UniqueDeviceID } from "@ionic-native/unique-device-id";

import "./PlaceDetail.scss";
import { rate } from "../axios/rate";

const PlaceDetail: React.FC<PlaceDetailProps> = (props) => {
  const { detail, onDismiss } = props;
  const [rating, setRating] = useState<number | null>(null);
  const routerHistory = useHistory<{ destination: [number | undefined, number | undefined] }>();
  const [presentToast] = useIonToast();

  const handleChangeRating = useCallback((event: React.ChangeEvent<{}>, value: number | null) => {
    setRating(value);
  }, []);

  const handleSubmitRate = useCallback(async () => {
    try {
      const deviceId = await UniqueDeviceID.get();
      await rate.post("/rate", {
        placeId: detail?._id,
        deviceId: deviceId,
        rate: rating,
      });
      presentToast({
        message: "Đã thêm đánh giá",
        color: "success",
      });
    } catch {
      presentToast({
        message: "Đã xảy ra lỗi khi đánh giá",
        color: "danger",
      });
    }
  }, []);

  const showRoutingOnTheMap = useCallback(() => {
    routerHistory.push("/map", { destination: [detail?.latitude, detail?.longitude] });
    onDismiss();
  }, [detail, routerHistory]);

  return (
    <IonModal isOpen={detail !== void 0} swipeToClose={true} animated={true}>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Chi tiết</IonTitle>
          <IonIcon className="btn-close" slot="end" size="large" icon={close} onClick={() => onDismiss()} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="place-detail-content">
          <div className="place-name">
            <h3>{detail?.place_name}</h3>
          </div>
          <p className="place-routing" onClick={showRoutingOnTheMap}>
            <IonIcon icon={compassSharp} size="large" />Chỉ đường
          </p>
          <p>{detail?.place_address}</p>
          <IonRouterLink target="_blank" href={detail?.place_info_url}>
            {detail?.place_info_url}
          </IonRouterLink>
          <br />
          <p>Lượt đánh giá: {detail?.rate_times}</p>
          <p>Điểm đánh giá: {detail?.rate}/5</p>
          <br />
          <div className="rating">
            <Rating name="rate-place" value={rating} onChange={handleChangeRating} />
            {rating !== null &&
              (rating === 1
                ? "Chán"
                : rating === 2
                ? "Tạm được"
                : rating === 3
                ? "Bình thường"
                : rating === 4
                ? "Tốt"
                : "Tuyệt vời")}
            <br />
            <span>
              <span className="submit-rate" onClick={() => handleSubmitRate()}>
                Gửi đánh giá
              </span>
            </span>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export { PlaceDetail };
