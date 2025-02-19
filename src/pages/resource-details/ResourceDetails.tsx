import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getLaunchesDetails, getRocketDetails } from "../../services/api";
import { Card, Loader, Text, Button, Image, Modal, Group, Stack } from "@mantine/core";
import { useState } from "react";

export default function ResourceDetail() {

    const [opened, setOpened] = useState<boolean>(false);

    const { id } = useParams();
    const { data, isLoading, error } = useQuery(["launchDetail", id], () => getLaunchesDetails((id as any)));

    const { data: rocketData, error: rocketError } = useQuery(["rocket", data?.rocket], () => getRocketDetails(data?.rocket), {
        enabled: !!data?.rocket,
    });

    if (isLoading) return <Loader variant="dots" />;
    if (error) return <Text color="red">Error fetching details</Text>;

    return (
        <>
            <Card shadow="lg" padding="xl" radius="md" style={{ maxWidth: "800px", margin: "auto" }}>
                <Stack spacing="md">
                    <Text size="xl" weight={600} align="center">{data.name}</Text>
                    <Text align="center" color="dimmed">{data.details || "No details available"}</Text>

                    {/* YouTube Embed */}
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${data.links.youtube_id}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />

                    {/* Image Section */}
                    <Image
                        src={data.links.patch.large}
                        alt={data.name}
                        withPlaceholder
                        radius="md"
                        fit="contain"
                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />

                    {/* Links */}
                    <Group position="center">
                        <Button component="a" href={data.links.article} target="_blank" color="blue" variant="outline" size="md">
                            Read Article
                        </Button>
                        <Button component="a" href={data.links.wikipedia} target="_blank" color="teal" size="md">
                            Read More
                        </Button>
                    </Group>

                    {/* Rocket Details Button */}
                    {rocketData && (
                        <Group position="center">
                            <Button onClick={() => setOpened(true)} color="orange" size="md">
                                Rocket Details
                            </Button>
                        </Group>
                    )}
                </Stack>
            </Card>

            {/* Rocket Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Rocket Details"
                centered
                size="lg"
            >
                {
                    rocketData && (
                        <Stack spacing="sm">
                            <Text><Text style={{ fontWeight: "bold" }}>Rocket Name:</Text> {rocketData.name}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>Country:</Text> {rocketData.country}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>Company:</Text> {rocketData.company}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>Description:</Text> {rocketData.description}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>Weight:</Text> {rocketData.mass.kg}kg</Text>
                            <Group position="center">
                                <Button component="a" href={rocketData.wikipedia} target="_blank" color="blue" size="md">
                                    Learn More
                                </Button>
                            </Group>
                        </Stack>
                    )
                }
            </Modal>
        </>
    );
}
