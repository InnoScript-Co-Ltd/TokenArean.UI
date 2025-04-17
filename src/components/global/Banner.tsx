import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BannerProps {
  title: string;
  path1?: string;
  path2?: string;
}

const Banner = ({ title, path1, path2 }: BannerProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl capitalize tracking-wide font-semibold text-primary">
        {title}
      </h3>
      <Breadcrumb className=" sm:ml-2">
        <BreadcrumbList>
          <BreadcrumbItem className="">
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {path1 || path2 ? (
            <>
              {path1 && (
                <>
                  <BreadcrumbSeparator className="" />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/dashboard/${path1.toLowerCase()}`}>
                      {path1}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {path2 && (
                <>
                  <BreadcrumbSeparator className="" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/dashboard/${path1?.toLowerCase()}/${path2.toLowerCase()}`}
                    >
                      {path2}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator className="" />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbSeparator className="" />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Banner;
