
export async function setupWebcam (videoRef) {
  if (!navigator.mediaDevices.getUserMedia || videoRef.value === null) {
    return
  }
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  videoRef.value.srcObject = stream
}
