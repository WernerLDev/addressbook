<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class ApiController extends Controller
{

    public function retrieveContacts() {
    
        $contacts = DB::table('contacts')->get();
        $response = [];
        foreach($contacts as $contact) {
            $response[] = [
                'id' => $contact->contactid,
                'contactname' => $contact->name,
                'photo' => $contact->photo,
                'workemail' => $contact->workemail,
                'privateemail' => $contact->privateemail,
                'workphone' => $contact->workphone,
                'mobilephone' => $contact->mobilephone,
                'address' => $contact->address,
                'notes' => $contact->notes,
                'favorite' => $contact->isfavorite === 1 ? true : false
            ];
        }
        return response()->json($response);
    }

    public function createContact(Request $request) {
    
        $id = DB::table('contacts')->insertGetId(
            ['name' => $request->input('contactname'), "photo" => "", "isfavorite" => 0]
        );
        
        return response()->json(["id" => $id, "status" => "success"]);
        
    }
    
    public function deleteContact($id) {
        DB::table('contacts')->where("contactid", "=", $id)->delete();
        return response()->json(["status" => "success"]);
    }
    
    public function updateContact(Request $request, $id) {
        $params = [
            "name" => $request->input("contactname"),
            "photo" => $request->input("photo"),
            "workemail" => $request->input("workemail"),
            "privateemail" => $request->input("privateemail"),
            "workphone" => $request->input("workphone"),
            "mobilephone" => $request->input("mobilephone"),
            "address" => $request->input("address"),
            "notes" => $request->input("notes")
        ];
    
        DB::table('contacts')->where("contactid", "=", $id)->update($params);
        return response()->json(["status" => "success"]);
    }
    
    public function setFavorite(Request $request, $id) {
        $fav = $request->input("favorite") == "true" ? 1 : 0;
        DB::table('contacts')->where("contactid", $id)->update(['isfavorite' => $fav]);
        return response()->json(["status" => "success", "isfavorite" => $fav]);
    }
    
    public function uploadPhoto(Request $request) {
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $filename  = time() . '.' . $image->getClientOriginalExtension();
            $targetdir = rtrim(app()->basePath('public/uploads'), '/');
            $image->move($targetdir, $filename);
            $newimage = $this->resizeAndCropImage($targetdir . "/" . $filename);
            $newimage->save($targetdir . "/" .  $filename);
            return response()->json(["status" => "success", "photo" =>  "uploads/" .  $filename]);
        } else {
            return response()->json(["status" => "failed... File too big?"]);
        }
    }
    
    private function resizeAndCropImage($imageurl) {
        $manager = new ImageManager(array('driver' => 'gd'));
        $image = $manager->make($imageurl);
        if($image->width() > $image->height()) {
            $ratio = $image->width() / $image->height();
            $newheight = 100;
            $newwidth = $ratio * 100;
        } else {
            $ratio = $image->height() / $image->width();
            $newheight = $ratio * 100;
            $newwidth = 100;
        }
        return $image->resize($newwidth, $newheight)->crop(100,100);
    }

}
