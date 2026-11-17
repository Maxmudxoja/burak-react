/**
 * Statistics.tsx — bosh sahifadagi raqamlar paneli (12 Restaurants, 8 Experience, 50+ Menu, 200+ Clients).
 * STATIK: backend yoki Redux ishlatmaydi, raqamlar to'g'ridan-to'g'ri yozilgan.
 * Orasidagi vertikal chiziqlar — umumiy Divider komponenti (components/divider).
 */
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">12</Box>
            <Box className="static-text">Restaurants</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08D" />

          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Experience</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Menu</Box>
          </Stack>

          <Divider height="64" width="2" bg="#E3C08D" />

          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-text">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
