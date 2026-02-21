import cloudinary from "@/lib/cloudinary";

// service functions to uplaod files/image and then to delete them

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

// converting file to buffer, then base64 string, then make dataURL for it
export async function uploadToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataURL = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataURL, {
      folder: "bite-social-app",
      // optimizing image to webp
      transformation: [{ format: "webp" }],
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteFromCloudinary(publicId:string) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}
