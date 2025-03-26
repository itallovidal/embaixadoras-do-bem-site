import { Input } from "@/presentation/components/global-components/input/input";
import { Heading } from "@/presentation/components/global-components/text/heading";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SelectedImageCard } from "@/presentation/components/global-components/selected-image-card/selected-image-card";
import { generatePreviewImages } from "@/presentation/utils/generate-preview-images";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/presentation/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { GetServerSideProps } from "next";
import { Button } from "@/presentation/components/global-components/button";
import nookies from "nookies";
import { useRouter } from "next/router";
import { api } from "@/infra/lib/axios/axios";
import { IGetCollaboratorResponse } from "@/domain/api-responses/get-collaborator-response";
import {
  collaboratorSchema,
  TCollaboratorSchema,
} from "@/validation/create-collaborator.schema";
import { editCollaborator } from "@/infra/adapters/collaborators/edit-collaborator";

interface IPreviewImg {
  id: string;
  src: string;
}

interface ISelectedImage {
  id: string;
  src: string;
  file: File;
}

function EditCollaborator({ collab }: { collab: IGetCollaboratorResponse }) {
  const [imgsToAdd, setImgsToAdd] = useState<IImageToAdd[]>([]);
  const [imgsToRemove, setImgsToRemove] = useState<IImageToRemove[]>([]);
  const router = useRouter();

  const { toast } = useToast();
  const {
    watch,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCollaboratorSchema>({
    defaultValues: {
      images: [],
      name: collab.name || undefined,
      responsability: collab.responsability || undefined,
    },
    resolver: zodResolver(collaboratorSchema),
  });

  const selectedImages = watch("images");

  useEffect(() => {
    getDefaultImages();
  }, []);

  function getDefaultImages() {
    const imgs = collab.images.map((img) => {
      return {
        src: img,
        id: img,
      };
    });
    setValue("images", imgs);
  }

  function handlePreviewImages(event: ChangeEvent<HTMLInputElement>) {
    const imgs = generatePreviewImages(event.target.files);
    const toPreview: { src: string; id: string }[] = [];
    const toAdd: { file: File; id: string }[] = [];

    imgs.forEach((file) => {
      toPreview.push({ src: file.src, id: file.id });
      toAdd.push({ file: file.file, id: file.id });
    });

    const allImages = [...toPreview];
    setValue("images", allImages);

    setImgsToAdd(() => [...toAdd]);
  }

  function onDelete(imgToDelete: string) {
    const selectedImages = getValues("images");
    const filteredImages = selectedImages.filter((image: IPreviewImg) => {
      if (image.id !== imgToDelete) return true;

      if (imgToDelete.includes("firebasestorage")) {
        setImgsToRemove((prevState) => [...prevState, image]);
        return false;
      }

      setImgsToAdd((prevState) =>
        prevState.filter((path) => {
          return path.id !== imgToDelete;
        })
      );

      return false;
    });
    setValue("images", filteredImages);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleEditCollab({
    images,
    ...collabData
  }: TCollaboratorSchema) {
    try {
      await editCollaborator({
        imgsToAdd,
        imgsToRemove,
        ...collabData,
        collectionId: collab.collectionId,
        id: collab.id,
      });

      toast({
        className: "bg-green-600 text-white",
        title: "Projeto salvo!",
        description: "Projeto salvo com sucesso.",
      });

      router.push("/admin/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: e.message,
          description: e.cause as string,
        });
      }
    }
  }

  return (
    <div className={"max-w-safeMobile xl:max-w-safeDesktop m-auto my-24"}>
      <div
        className={
          "flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center"
        }
      >
        <Heading className={"mb-4"}>Edição de Colaborador</Heading>

        <div className={" flex justify-end sm:my-5"}>
          <Button href={"/admin/dashboard"} Icon={ArrowLeft} variant={"ghost"}>
            Voltar
          </Button>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={"p-4 bg-gray-200 rounded-lg gap-8 flex flex-col"}
      >
        <div className={"flex gap-4 flex-col"}>
          <div className={"flex flex-col flex-1 gap-4 "}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={"Nome do colaborador"}
                  errorMessage={errors.name?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={"name"}
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={"Cargo do colaborador"}
                  errorMessage={errors.responsability?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={"responsability"}
            />
          </div>

          <div>
            <Input
              accept={"image/png, image/jpeg, image/jpg, image/webp"}
              className={"cursor-pointer w-fit"}
              field={"Imagem do colaborador"}
              type={"file"}
              onChange={(event) => handlePreviewImages(event)}
              errorMessage={errors.images?.message}
              disabled={isSubmitting}
            />
          </div>
        </div>
        {selectedImages.length > 0 && (
          <div className={"flex gap-4 flex-wrap p-4 bg-white rounded-md"}>
            {selectedImages.map((value: ISelectedImage) => {
              return (
                <SelectedImageCard
                  key={value.id}
                  {...value}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        )}
      </form>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleEditCollab)}
        className={"self-center my-12"}
      >
        Salvar Edição
      </Button>
    </div>
  );
}

export default EditCollaborator;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as { id: string };

  const cookies = nookies.get(req.cookies);

  const response = await api.get(`/admin/collaborators/${id}`, {
    headers: {
      Authorization: "Bearer " + cookies["@EDB:user-token"],
    },
  });

  const collab = response.data;

  return {
    props: { collab },
  };
};
