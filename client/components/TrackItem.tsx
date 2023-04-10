import React from "react";
import {ITrack} from "../types/tracks";
import {Card, Grid} from "@mui/material";
import styles from "../styles/track/TrackItem.module.scss";
import IconButton from "@mui/material/IconButton";
import {Delete, PauseCircle, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useTimeConverter} from "../hooks/useTimeConverter";
import {useDeleteTrackMutation} from "../store/reducers/apiSlice";

interface TrackItemProps {
    track: ITrack,
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter();

    const { active, pause, currentTime, duration } = useTypedSelector(state => state.player);
    const { playTrack, pauseTrack, setActiveTrack } = useAction();
    const [ deleteTrack ] = useDeleteTrackMutation();

    const left = useTimeConverter(currentTime);
    const right = useTimeConverter(duration);

    const play = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTrack(track);
        if (pause) {
            playTrack();
        } else {
            pauseTrack();
        }
    };

    const deleteTrackFunction = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteTrack(track._id);
    };

    return (
        <Card className={styles.track} onClick={() => router.push("tracks/" + track._id)}>

            <IconButton onClick={play}>
                {!pause && active === track
                    ? <PauseCircle />
                    : <PlayArrow />
                }
            </IconButton>

            <img className={styles.picture} src={`http://192.168.0.106:5000/${track.picture}`} alt={"track logo"}
                 key={track._id} />

            <Grid container direction={"column"} style={{ width: 200, margin: "0 20px" }}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </Grid>

            {active === track && <div className={styles.trackTime}> {left}/{right} </div>}

            <IconButton onClick={deleteTrackFunction} className={styles.delete}>
                <Delete />
            </IconButton>

        </Card>
    );
};

export default TrackItem;
