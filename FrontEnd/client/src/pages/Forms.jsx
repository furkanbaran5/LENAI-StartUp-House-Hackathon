import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export default function AccountInfoForm() {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        accountName: "",
        accountType: "",
        industry: "",
        description: "",
        website: "",
        goals: [],
        contentType: "",
        aiPreference: "",
        audienceType: "",
        ageRange: "",
        gender: "",
        locations: "",
        hasRunAds: "",
        usageFrequency: "",
        contactName: "",
        email: "",
        phone: "",
        consent: "",
    });

    const [uploadedFile, setUploadedFile] = useState("");

    const handleCheckboxChange = (field, value) => {
        setFormData((prev) => {
            const currentValues = prev[field] || [];
            return {
                ...prev,
                [field]: currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value],
            };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 100 * 1024 * 1024; // 10 MB
            if (file.size > maxSize) {
                toast({
                    title: "File too large",
                    description: "Maximum file size is 10 MB.",
                    variant: "destructive",
                });
                e.target.value = ""; // sıfırla
                setUploadedFile(null);
                return;
            }

            setUploadedFile(file);
            toast({
                title: "File uploaded",
                description: `${file.name} successfully added.`,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        console.log("Uploaded File:", uploadedFile);

        toast({
            title: "Form submitted successfully!",
            description: "Your information has been saved.",
        });
    };

    return (
        <div className="pt-16 py-16 bg-gradient-to-b from-background to-muted/20 min-h-screen mt-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>👤 Account Information</CardTitle>
                        <CardDescription>Fill in your account and marketing details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* 1. Account Information */}
                            <section className="space-y-6">
                                <div>
                                    <Label>Account / Brand Name</Label>
                                    <Input
                                        value={formData.accountName}
                                        onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                        placeholder="Your brand name"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>Account Type</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, accountType: val })}
                                        value={formData.accountType}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        <div><RadioGroupItem value="personal" id="personal" /> <Label htmlFor="personal">Personal brand / influencer</Label></div>
                                        <div><RadioGroupItem value="business" id="business" /> <Label htmlFor="business">Business / Company</Label></div>
                                        <div><RadioGroupItem value="organization" id="organization" /> <Label htmlFor="organization">Organization / NGO</Label></div>
                                        <div><RadioGroupItem value="creator" id="creator" /> <Label htmlFor="creator">Content creator / community page</Label></div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>Industry or Field of Activity</Label>
                                    <Input
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        placeholder="e.g., fashion, technology, finance..."
                                    />
                                </div>

                                <div>
                                    <Label>Describe what you promote or represent</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder='Example: "I offer digital marketing consulting"'
                                        className="min-h-[100px]"
                                    />
                                </div>

                                <div>
                                    <Label>Website</Label>
                                    <Input
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </section>

                            {/* 2. Goals and Purpose */}
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">🎯 Goals and Purpose</h2>
                                <div className="space-y-2">
                                    <Label>What do you want to achieve with DAY EYE?</Label>
                                    {["Increase visibility/reach", "Get more engagement", "Drive traffic", "Promote event/campaign"].map((goal) => (
                                        <div key={goal} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData.goals.includes(goal)}
                                                onCheckedChange={() => handleCheckboxChange("goals", goal)}
                                            />
                                            <span>{goal}</span>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <Label>What type of content do you share?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, contentType: val })}
                                        value={formData.contentType}
                                    >
                                        <div><RadioGroupItem value="product" id="product" /> <Label htmlFor="product">Product/service promotions</Label></div>
                                        <div><RadioGroupItem value="educational" id="educational" /> <Label htmlFor="educational">Educational content</Label></div>
                                        <div><RadioGroupItem value="lifestyle" id="lifestyle" /> <Label htmlFor="lifestyle">Lifestyle/personal posts</Label></div>
                                        <div><RadioGroupItem value="news" id="news" /> <Label htmlFor="news">News/campaigns/social posts</Label></div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>Do you want DAY EYE to generate content or optimize yours?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, aiPreference: val })}
                                        value={formData.aiPreference}
                                    >
                                        <div><RadioGroupItem value="create" id="create" /> <Label htmlFor="create">Create new recommendations</Label></div>
                                        <div><RadioGroupItem value="optimize" id="optimize" /> <Label htmlFor="optimize">Optimize my own content</Label></div>
                                    </RadioGroup>
                                </div>
                            </section>

                            {/* 3. Target Audience */}
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">👥 Target Audience</h2>
                                <div>
                                    <Label>Who is your target audience?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, audienceType: val })}
                                        value={formData.audienceType}
                                    >
                                        <div><RadioGroupItem value="individuals" id="individuals" /> <Label htmlFor="individuals">Individuals</Label></div>
                                        <div><RadioGroupItem value="businesses" id="businesses" /> <Label htmlFor="businesses">Businesses</Label></div>
                                        <div><RadioGroupItem value="both" id="both" /> <Label htmlFor="both">Both</Label></div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>Age Range</Label>
                                    <Input
                                        value={formData.ageRange}
                                        onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                                        placeholder="e.g., 18–35"
                                    />
                                </div>

                                <div>
                                    <Label>Gender</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, gender: val })}
                                        value={formData.gender}
                                    >
                                        <div><RadioGroupItem value="female" id="female" /> <Label htmlFor="female">Female</Label></div>
                                        <div><RadioGroupItem value="male" id="male" /> <Label htmlFor="male">Male</Label></div>
                                        <div><RadioGroupItem value="all" id="all" /> <Label htmlFor="all">All</Label></div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>Locations (city/country)</Label>
                                    <Input
                                        value={formData.locations}
                                        onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                                        placeholder="Istanbul, Turkey"
                                    />
                                </div>
                            </section>

                            {/* 4. Account History */}
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">📈 Account History</h2>
                                <div>
                                    <Label>Have you run social media ads before?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, hasRunAds: val })}
                                        value={formData.hasRunAds}
                                    >
                                        <div><RadioGroupItem value="yes" id="yesAds" /> <Label htmlFor="yesAds">Yes</Label></div>
                                        <div><RadioGroupItem value="no" id="noAds" /> <Label htmlFor="noAds">No</Label></div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>How often do you plan to use DAY EYE?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, usageFrequency: val })}
                                        value={formData.usageFrequency}
                                    >
                                        <div><RadioGroupItem value="weekly" id="weekly" /> <Label htmlFor="weekly">Weekly</Label></div>
                                        <div><RadioGroupItem value="monthly" id="monthly" /> <Label htmlFor="monthly">Monthly</Label></div>
                                        <div><RadioGroupItem value="occasional" id="occasional" /> <Label htmlFor="occasional">Occasional</Label></div>
                                    </RadioGroup>
                                </div>
                            </section>

                            {/* 5. Contact and Consent */}
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">📩 Contact and Consent</h2>
                                <div>
                                    <Label>Contact Name</Label>
                                    <Input
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>Email Address</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="example@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>Phone / WhatsApp (optional)</Label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+90 5xx xxx xx xx"
                                    />
                                </div>

                                <div>
                                    <Label>Do you agree to anonymous data usage?</Label>
                                    <RadioGroup
                                        onValueChange={(val) => setFormData({ ...formData, consent: val })}
                                        value={formData.consent}
                                    >
                                        <div><RadioGroupItem value="yes" id="yesConsent" /> <Label htmlFor="yesConsent">Yes</Label></div>
                                        <div><RadioGroupItem value="no" id="noConsent" /> <Label htmlFor="noConsent">No</Label></div>
                                    </RadioGroup>
                                </div>
                            </section>

                            {/* 📎 File Upload Section */}
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">📎 Upload Additional Document</h2>
                                <p className="text-muted-foreground text-sm">
                                    You can upload one file (max 100 MB). Supported formats: PDF, DOCX, JPG, PNG.
                                </p>

                                <div className="flex flex-col items-start space-y-3">
                                    <Label htmlFor="fileUpload">Select File</Label>
                                    <div className="flex items-center space-x-3">
                                        <Input
                                            id="fileUpload"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="cursor-pointer"
                                        />
                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    {uploadedFile && (
                                        <p className="text-sm text-muted-foreground">
                                            ✅ <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* ✅ Submit Button */}
                            <Button type="submit" className="w-full text-lg py-6">
                                Submit Form
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
